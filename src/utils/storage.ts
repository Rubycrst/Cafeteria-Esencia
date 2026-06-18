const SUPABASE_PROJECT_URL = "https://vzvyhstdzcvljihgldzc.supabase.co";
const PRODUCT_BUCKET = "product-images";
const BANNER_BUCKET = "banner-images";

export function getStorageUrl(path: string): string {
  return `${SUPABASE_PROJECT_URL}/storage/v1/object/public/${PRODUCT_BUCKET}/${path}`;
}

function getBannerUrl(path: string): string {
  return `${SUPABASE_PROJECT_URL}/storage/v1/object/public/${BANNER_BUCKET}/${path}`;
}

export const BANNER_HERO = getBannerUrl("portada.jpg");
export const BANNER_ABOUT = getBannerUrl("foto1.jpg");
export const BANNER_MENU = getBannerUrl("portada2.jpg");
  