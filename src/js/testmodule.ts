const testFunc = async (a: number, b: number): Promise<number> => {
  const sum = await (a + b);
  return sum;
};

export default testFunc;
