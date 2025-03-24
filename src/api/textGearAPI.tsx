import { text_gear_url } from "../environment";

// ✅ Fetch Exceptional Words from API
export const fetchExceptionalWords = async () => {
  try {
    const response = await fetch(`${text_gear_url}custom/listexceptions?key=3fnBKtcFrqCFqBOp`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to fetch exceptional words");
    }

    return { success: true, data: data.response?.exceptions || [] };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
};

// ✅ Add a new Exceptional Word
export const addExceptionalWord = async (data: { text: string; type: number; lang: string }) => {
  try {
    const response = await fetch(`${text_gear_url}custom/addexception`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: data.text,
        type: data.type,
        lang: data.lang,
        key: "3fnBKtcFrqCFqBOp",
      }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.error || "Failed to add exceptional word");
    }

    return { success: true, message: "Word added successfully!" };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
};
