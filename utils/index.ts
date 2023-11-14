export async function fetchGoods() {
  const response = await fetch(
    "https://indira-backend.vercel.app/api/goods/getgoods"
  );

  const result = response.json();

  return result;
}
