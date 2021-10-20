import { useRef, useMemo } from 'react';
import { List } from 'immutable'; 
import { usePromos } from '@findify/react-connect';

const useLazyPromos = () => {
  const cachedPromos = useRef(List())
  const { items: promos } = usePromos()

  return useMemo(() => {
    const promosToAdd = promos.filter(p => !cachedPromos.current.includes(p))
    cachedPromos.current = cachedPromos.current.concat(promosToAdd)
    return cachedPromos.current;
  }, [promos])
}

export default useLazyPromos;