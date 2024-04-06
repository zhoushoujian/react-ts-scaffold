import { useHistory } from 'react-router-dom';

const useRouter = () => {
  const history = useHistory();
  return history;
};

export default useRouter;
