from django.contrib.auth import get_user_model
from rest_framework import generics
from .serializer import UserProfileSerializer, UserSerializer
from .models import Profile
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from rest_framework.views import APIView
from rest_framework import permissions, status
from rest_framework.response import Response
from django.contrib import auth
from .tokens import account_activation_token
from django.core.mail import EmailMessage
from django.shortcuts import get_object_or_404, redirect
from django.template.loader import render_to_string
from django.contrib.sites.shortcuts import get_current_site
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError

User = get_user_model()


def activate(request, uidb64, token):
    User = get_user_model()
    try:
        # decodeing the tokein to get the user's id
        uid = force_str(urlsafe_base64_decode(uidb64))
        # checking if the user pk = uid
        user = User.objects.get(pk=uid)
    except:
        user = None

    if user is not None and account_activation_token.check_token(user, token):
        user.is_active = True
        user.save()
        return redirect('/')
    else:
        return print("error")
    return redirect('/')


def activateEmail(request, user, to_email):
    token = account_activation_token.make_token(
        user)  # Generate the activation token
    mail_subject = "Activate your account"
    message = render_to_string("template_activation_account.html",
                               {
                                   'user': user.username,
                                   'domain': get_current_site(request).domain,
                                   'uid': urlsafe_base64_encode(force_bytes(user.pk)),
                                   'token': token,
                                   'protocol': 'https' if request.is_secure() else 'http'
                               }
                               )
    email = EmailMessage(mail_subject, message, to=[to_email])

    if email.send():
        return redirect('/')
    else:
        print("erro")


@method_decorator(ensure_csrf_cookie, name='dispatch')
class ProfileView(APIView):
    def get(self, request, format=None):
        user = self.request.user
        username = user.username
        email = user.email
        user = User.objects.get(id=user.id)
        profile = Profile.objects.get(user=user)
        user_profile = UserProfileSerializer(profile)

        return Response({'profile': user_profile.data, 'username': str(username), 'email': email})


@method_decorator(ensure_csrf_cookie, name='dispatch')
class UserView(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, username, format=None, *args, **kwargs):
        user = User.objects.get(username=username)
        username = user.username
        email = user.email
        user = User.objects.get(id=user.id)
        profile = Profile.objects.get(user=user)
        user_profile = UserProfileSerializer(profile)

        return Response({'profile': user_profile.data, 'email': email})


@method_decorator(ensure_csrf_cookie, name='dispatch')
class UpdateUserView(APIView):
    def put(self, *args, **kwargs):
        try:
            if self.request.method == 'PUT':
                data = self.request.data
                new_username = data['username']  # new username
                new_email = data['email']
                user_now = self.request.user  # user
                user = User.objects.get(id=user_now.id)
                user.username = new_username
                user.email = new_email
                user.save()
                return Response({'success': "updated successfully"})
            else:
                return Response({"error": "Method not allowed."}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
        except Exception as e:
            return Response({"error": "could not update this profile!"}, {"detail": e})


@method_decorator(ensure_csrf_cookie, name='dispatch')
class UpdateProfileView(generics.UpdateAPIView):
    queryset = Profile.objects.all()
    serializer_class = UserProfileSerializer()

    def get_object(self, *args, **kwargs):
        profile = Profile.objects.get(user=self.request.user)
        return profile

    def update(self, request, *args, **kwargs):
        if self.request.method == 'PUT':
            instance = self.get_object(user=request.user)
            serializer = UserProfileSerializer(
                instance, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({"success": "profile image updated successfully"})
            else:
                return Response({"error": serializer.errors})
        else:
            return Response({"error": "Method not allowed."}, status=status.HTTP_405_METHOD_NOT_ALLOWED)



class UserProfileAPIView(generics.UpdateAPIView):
    queryset = Profile.objects.all()
    serializer_class = UserProfileSerializer
    lookup_field = 'pk'

    def perform_update(self, serializer):
        instance = serializer.save()


class UserAPIView(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'pk'

    def perform_update(self, serializer):
        instance = serializer.save()


@method_decorator(ensure_csrf_cookie, name='dispatch')
class GetCsrfCookie(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, format=None):
        return Response({'success': 'CSRF cookie set'})


class LogoutUser(APIView):

    def post(self, request, format=None):
        try:
            auth.logout(request)
            return Response({"success": "loged out successfully!"})
        except Exception as e:
            return Response({"error": "could not loginout!", "detail": e})


@method_decorator(csrf_protect, name='dispatch')
class LoginUser(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        if request.method == 'POST':
            data = self.request.data
            username = data['username']
            password = data['password']
            if not username or not password:
                return Response({"error": "Please provide both username and password."}, status=status.HTTP_400_BAD_REQUEST)

            user = auth.authenticate(username=username, password=password)

            if user is not None:
                auth.login(request, user)
                return Response({"success": "login successfully"})
            else:
                return Response({"error": "Invalid username or password."}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({"detail": "Method not allowed."}, status=status.HTTP_405_METHOD_NOT_ALLOWED)



@method_decorator(csrf_protect, name='dispatch')
class CheckAuth(APIView):
    def get(self, request, format=None):
        is_authenticated = self.request.user.is_authenticated
        if is_authenticated:
            return Response({"isAuthenticated": "success"})
        else:
            return Response({"isAuthenticated": "error"})


@method_decorator(csrf_protect, name='dispatch')
class RegisterUser(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        if request.method == 'POST':
            data = self.request.data

            username = data['username']
            email = data['email']
            password = data['password']
            password2 = data['password2']

            queryset = User.objects.all()
            if queryset.filter(username=username).exists():
                return Response({"error": "username address must be unique."})
            elif queryset.filter(email=email).exists():
                return Response({"error": "Email address must be unique."})
            try:
                # Validate password using Django's built-in validators
                validate_password(password, user=None, password_validators=None)
                if password == password2:
                    user = User.objects.create_user(
                        username=username, email=email, password=password)
                    user.is_active = False
                    user.save()
                    activateEmail(request, user, email)
                    return Response({"success": "User created successfully!"})
                else:
                    return Response({"error": "Passwords do not match!"})
            except ValidationError as e:
                return Response({"error": e.messages})
        else:
            return Response({"error": "Method not allowed."}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
