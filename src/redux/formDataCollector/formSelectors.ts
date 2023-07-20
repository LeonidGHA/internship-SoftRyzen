import { RootState } from 'constants/types';

export const formData = (state: RootState) => state.formCollector.formData;
export const collectorStep = (state: RootState) => state.formCollector.step;
