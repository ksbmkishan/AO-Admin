export let API_URL;

if (process.env.NODE_ENV === "development") {
  API_URL = "https://dev-api.example.com";
} else if (process.env.NODE_ENV === "production") {
  API_URL = "https://api.jewelish.co.in";
} else if (process.env.NODE_ENV === "staging") {
  API_URL = "https://stage-api.example.com";
} else {
  API_URL = "http://localhost:4000";
}
API_URL = "https://api.jewelish.co.in";
// API_URL = "http://localhost:4000";

API_URL = `${API_URL}/api/v1`;
