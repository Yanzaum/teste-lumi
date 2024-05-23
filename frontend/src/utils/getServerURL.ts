export function getServerURL() {
    const url = import.meta.env.NEXT_PUBLIC_SERVER_URL;
  
    if (!url) {
      throw new Error('NEXT_PUBLIC_SERVER_URL not defined in .env');
    }
  
    return url;
}