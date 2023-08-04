interface parsedResponse {}

export default (data: string) => {
  let datas = {
    datas: JSON.parse(
      `[${data
        .replaceAll("data:", ",")
        .replace(", [DONE]", "")
        .replace(",", "")}]`
    ),
  };

  return datas;
};
