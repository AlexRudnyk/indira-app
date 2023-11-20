export async function fetchGoods() {
  try {
    const response = await fetch(
      "https://indira-backend.vercel.app/api/goods/getgoods"
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchSpecificGood(id: string) {
  try {
    const response = await fetch(
      `https://indira-backend.vercel.app/api/goods/id/${id}`
    );
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
}
