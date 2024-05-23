export function getServerURL() {
    const url = import.meta.env.VITE_SERVER_URL;
  
    if (!url) {
      throw new Error('SERVER_URL not defined in .env');
    }
  
    return url;
}