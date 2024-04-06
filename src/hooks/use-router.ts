import { useNavigate } from 'react-router-dom';

const useRouter = () => {
  const navigate = useNavigate();
  return { push: navigate };
};

export default useRouter;
