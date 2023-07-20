import { useDispatch } from 'react-redux';

import { AppDispatch } from 'constants/types';

const useAppDispatch: () => AppDispatch = useDispatch;

export default useAppDispatch;
