/**
 * @module components/common/Image
 */

 import React, { useRef, useState, useEffect, useMemo } from 'react';
 import cx from 'classnames';
 import styles from 'components/common/Image/styles.css';
 
 enum LazyStrategy {
   native,
   observer,
   none,
 }
 
 const lazyStrategy = ((): LazyStrategy => {
   if ('loading' in HTMLImageElement.prototype) return LazyStrategy.native;
   if ('IntersectionObserver' in global) return LazyStrategy.observer;
   return LazyStrategy.none;
 })();
 
 const useViewPort = (lazyOffset = 200) => {
   const [ready, setReady] = useState(false);
   const element = useRef<HTMLDivElement>(null);
 
   useEffect(() => {
     if (!element.current || ready) return;
 
     const handleIntersect = (entries, observer) => {
       if (!element.current) return;
       entries.forEach((entry) => {
         if (entry.isIntersecting) {
           setReady(true);
           observer.unobserve(entry.target);
         }
       });
     };
 
     const observer = new IntersectionObserver(handleIntersect, {
       root: null,
       rootMargin: `${lazyOffset}px`,
       threshold: 0,
     });
 
     observer.observe(element.current as any);
     return () => observer && observer.unobserve(element.current as any);
   }, [element]);
 
   return { ready, element };
 };
 
 const getSource = (src, fx): string[] =>
   useMemo(() => {
     const res = (fx && fx(src, window?.innerWidth)) || src;
     if (!res) return [];
 
     return (typeof res === 'string' ? [res] : res).filter(
       (value, index, self) => value && self.indexOf(value) === index
     );
   }, [src]);
 
 
 type ImageViewProps = {
   lazy?: boolean;
   src: string | string[];
   alt: string;
   aspectRatio: number;
 }
 
 type ImageProps = ImageViewProps & {
   getSrc: (src: string | string[], width: number) => string | string[];
   lazyOffset?: number
 };
 
 const ImageView: React.FC<ImageViewProps & {
   register?: React.RefObject<HTMLDivElement>
   isReady?: boolean
 }> = ({
   lazy,
   src,
   alt,
   aspectRatio,
   register,
   isReady = true
 }) => {
   const aspect = aspectRatio > 0;
   const _src: string[] = Array.isArray(src) ? src : [src];
 
   return <div
     ref={register}
     style={{
       paddingBottom: aspect ? `${aspectRatio * 100}%` : 'auto',
     }}
     className={cx(
       styles.root,
       (aspect && styles.aspect) || styles.static,
       _src.length > 1 && styles.multiple
     )}
   >
     {_src.map((src, index) => (
       <img
         src={src}
         key={src}
         alt={alt}
         decode="async"
         loading={lazy ? 'lazy' : undefined}
         className={cx(styles.image, index && styles.next)}
         display-if={isReady}
       />
     ))}
   </div>
 }
 
 export default ({
   lazy,
   getSrc,
   src,
   lazyOffset,
   ...props
 }: ImageProps) => {
   const _src = getSource(src, getSrc);
   if (lazyStrategy === LazyStrategy.native || lazyStrategy === LazyStrategy.none || !lazy) {
     return <ImageView
       src={_src}
       lazy={lazy && lazyStrategy === LazyStrategy.native}
       {...props}
     />
   }
 
   const { ready, element } = useViewPort(lazyOffset);
 
   return <ImageView
     src={_src}
     lazy={true}
     register={element}
     isReady={ready}
     {...props}
   />
 };
