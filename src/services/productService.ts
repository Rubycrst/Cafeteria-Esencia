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

export async function searchProducts(query: string): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_available", true)
    .textSearch("search_vector", query, {
      type: "websearch",
      config: "spanish",
    })
    .order("created_at", { ascending: false });

  if (error) {
    const { data: fallback, error: fallbackError } = await supabase
      .from("products")
      .select("*")
      .eq("is_available", true)
      .ilike("name", `%${query}%`)
      .order("created_at", { ascending: false });

    if (fallbackError) {
      console.error("Error searching products:", fallbackError);
      return [];
    }

    return fallback ?? [];
  }

  return data ?? [];
}
