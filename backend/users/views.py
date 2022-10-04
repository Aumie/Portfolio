"""
View for the user API.
"""
from rest_framework import generics, permissions, status, response
# from rest_framework.authtoken.views import ObtainAuthToken
# from rest_framework.settings import api_settings
from rest_framework.views import APIView
from users.serializers import (
    UserSerializer,
    # AuthTokenSerializer
)
from rest_framework_simplejwt.tokens import RefreshToken


class CreateUserView(generics.CreateAPIView):
    """Create a new user in the system"""
    serializer_class = UserSerializer


# class CreateTokenView(ObtainAuthToken):
#     """Create a new auth token for user."""
#     serializer_class = AuthTokenSerializer
#     # ensure that this view show in rest_framework api page
#     renderer_classes = api_settings.DEFAULT_RENDERER_CLASSES


class ManageUserView(generics.RetrieveUpdateAPIView):
    """
    Manage the authenticated user.
    """
    serializer_class = UserSerializer
    # authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        """Retrieve and return the authenticated user."""
        # return user from the request that has run through our serializer
        return self.request.user


class BlacklistTokenView(APIView):

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return response.Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return response.Response(status=status.HTTP_400_BAD_REQUEST)
