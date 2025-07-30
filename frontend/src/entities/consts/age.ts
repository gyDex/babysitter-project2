export const startAge = Array.from({ length: 70 - 14 + 1 }, (_, i) => {
  const value = i + 14;
  return {
    name: `от ${value}`,
    id: String(value),
  };
});

export const finalAge = () => {
    return Array.from({ length: 70 - 14 + 1 }, (_, i) => {
      const value = i + 14;
      return {
        name: `до ${value}`,
        id: String(value),
      };
    });
} 