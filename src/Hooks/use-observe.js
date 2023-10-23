import React, { useEffect, useState } from 'react'
import useHttp from './use-http';

export default function useObserve(Ref, margin, threshold=0) {
    const [sticky, setSticky] = useState() 
    useEffect(() => {

        if (Ref.current) {
            const obs = new IntersectionObserver(function (entries) { 
                const ent = entries[0]
                console.log(ent)
                setSticky(ent.isIntersecting)
            }, {
                root: null,
                threshold: threshold,
                rootMargin: margin
            })
            obs.observe(Ref.current)
        }
        else {
            console.log('boservee', Ref)
        }
    })

  console.log(sticky, 9);
    return {
      sticky
  }
}
