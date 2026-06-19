import { supabase } from "../utils/supabase";

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  image_url: string;
  rating: number;
  region: string;
  category_id: string | null;
  is_featured: boolean;
  is_available: boolean;
  created_at: string;
};

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_available", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }

  return data ?? [];
}

export async function getProductById(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching product:", error);
    return null;
  }

  return data;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_featured", true)
    .eq("is_available", true)
    .limit(6);

  if (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }

  return data ?? [];
}

export async function getRelatedProducts(currentId: string, limit = 4): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .neq("id", currentId)
    .eq("is_available", true)
    .limit(limit);

  if (error) {
    console.error("Error fetching related products:", error);
    return [];
  }

  return data ?? [];
}

export type Category = {
  id: string;
  name: string;
  slug: string;
};

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from("categories")
    .select("id, name, slug")
    .order("name");

  if (error) {
    console.error("Error fetching categories:", error);
    return [];
  }

  return data ?? [];
}

export async function uploadProductImage(file: File): Promise<string | null> {
  const fileExt = file.name.split(".").pop();
  const fileName = `${crypto.randomUUID()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error } = await supabase.storage
    .from("product-images")
    .upload(filePath, file);

  if (error) {
    console.error("Error uploading image:", error);
    return null;
  }

  const { data: urlData } = supabase.storage
    .from("product-images")
    .getPublicUrl(filePath);

  return urlData?.publicUrl ?? null;
}

export function filterProductsByQuery(products: Product[], query: string): Product[] {
  if (!query.trim()) return products;
  const q = query.toLowerCase().trim();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description?.toLowerCase().includes(q) ||
      p.region?.toLowerCase().includes(q)
  );
}
