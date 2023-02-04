export const toCodepointString = (string) =>
  [...string]
    .map((char) => {
      const code = char.codePointAt(0);
      return code > 127 ? `${code.toString(16)}` : char;
    })
    .join("_");
