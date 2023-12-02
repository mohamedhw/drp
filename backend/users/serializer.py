from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Profile
from django.contrib.auth.models import User

User = get_user_model()

class UserProfileSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Profile
        fields = ['image', 'cover', 'user_u', 'user']


class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()
    class Meta:
        model = User
        fields = ['email']


    def validate_email(self, value):
        """
        Check if the email is unique among users.
        """
        user = self.instance  # Get the current user instance if available
        queryset = User.objects.exclude(pk=user.pk) if user else User.objects
        if queryset.filter(email=value).exists():
            raise serializers.ValidationError("Email address must be unique.")
        return value
