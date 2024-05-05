# from posts.models import Visit
#
#
# class VisitMiddleware:
#     def __init__(self, get_response):
#         self.get_response = get_response
#
#     def __call__(self, request):
#
#         # Capture the IP address of the visitor
#         ip_address = request.META.get('REMOTE_ADDR')
#
#         visited = Visit.objects.values_list("ip_address", flat=True)
#
#         # Save the visit
#         if ip_address not in visited:
#             Visit.objects.create(ip_address=ip_address)
#
#         response = self.get_response(request)       
#
#         return response
