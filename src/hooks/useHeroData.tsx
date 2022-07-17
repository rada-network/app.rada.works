/* eslint-disable @typescript-eslint/ban-types */
export const useHeroData = (types: string, Data: {}) => {
  const HeroData = Data.get(types);

  return HeroData;
};
