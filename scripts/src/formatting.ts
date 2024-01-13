import prettier from "prettier";

type FormatSuccess = { text: string };
type FormatFailure = { isError: true; error: unknown };
type FormatResult = FormatFailure | FormatSuccess;

export const formatTypescript = async (code: string): Promise<FormatResult> => {
  try {
    const text = await prettier.format(code, {
      parser: "typescript",
    });
    return { text };
  } catch (e) {
    return { isError: true, error: e };
  }
};

export const isFormattedError = (
  input: FormatResult,
): input is FormatFailure => {
  return (input as { isError: true }).isError === true;
};
