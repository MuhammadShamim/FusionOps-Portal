export const environment = {
  production: true,
  enableDebugTools: false,
  enableRouteTracing: false,
  mulesoftApi: {
    baseUrl: 'http://localhost:8081/api', // Update this with your production Mulesoft URL
    clientId: 'your_production_client_id',
    clientSecret: 'your_production_client_secret'
  }
};