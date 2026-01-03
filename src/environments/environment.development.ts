export const environment = {
  anime_api_domain: 'https://localhost:7145',
  recommender_api_domain: 'https://localhost:8000',
  x_client_key: 'AnimeHubSpaClient',
  providers: {
    allowed: ['google', 'facebook'],
    google: {
      google_client_id:
        '95121559112-qq7a76f4vh3tgqd740nuk4aoj7nbguak.apps.googleusercontent.com',
    },
    facebook: {
      oauth_url: 'https://www.facebook.com/v17.0/dialog/oauth',
      facebook_app_id: '864396436490539',
      response_type: 'code',
      scope: 'email,public_profile',
      challenge_method: 'S256',
    },
  },
};
