import { useEffect, useRef, useState } from "react";
// [TODO] when user add triggerPercentage make sure to trigger the parallax effect only when the scroll position reaches that percentage of the container's height or width. This will allow for more precise control over when the effect starts and stops.

type OPTIONS ={
    direction?: 'vertical' | 'horizontal'| 'both';
    smoothness?: number;
    speed?: number;
    stiffness?: number;
    damping?: number;
    easingFunctionName?: 'linear' | 'easeIn' | 'easeOut' | 'easeInOut'|'spring'|"bounce"|"elastic"|"anticipate";
    customEasingFunction?: (t: number) => number;
    //triggerPercentage?: number;
    enabled?: boolean;
    reverseDirection?: boolean;
    containerRef?: React.RefObject<HTMLElement>;
}
const linearLerp =(target: {x:number,y:number}, current: {x:number,y:number}, factor: number,direction:'y'|'x')=>{
    if(direction === 'y'){
         return current.y + (target.y - current.y) * factor;
    }else{
        return current.x + (target.x - current.x) * factor;
    }
   
}
const springlerp =(target: {x:number,y:number}, current: {x:number,y:number}, direction:'y'|'x', stiffness: number, damping: number,velocityRef: any)=>{
   const springForce = stiffness * (target[direction] - current[direction]);
      
      // 2. Apply force to velocity, then apply dampening (friction)
      if(direction === 'y'){
       velocityRef.current.vy += springForce;
      velocityRef.current.vy *= (1 - damping);

      // 3. Update current position by adding velocity
      return current[direction] + velocityRef.current.vy;
      }else{
        velocityRef.current.vx += springForce;
      velocityRef.current.vx *= (1 - damping);

      // 3. Update current position by adding velocity
      return current[direction] + velocityRef.current.vx;
      }
     
}
const easeInLerp = (target: {x:number,y:number}, current: {x:number,y:number}, factor: number,direction:'y'|'x'): number => {
    // Clamp the factor between 0 and 1 to prevent overshooting
    const t = Math.max(0, Math.min(1, factor));
    
    // Square the factor to create the ease-in acceleration curve
    const easeInFactor = t * t;
    
    return current[direction] + (target[direction] - current[direction]) * easeInFactor;
}
const easeOutLerp = (target: {x:number,y:number}, current: {x:number,y:number}, factor: number,direction:'y'|'x') => {
    // Clamp factor between 0 and 1 just in case
    const t = Math.max(0, Math.min(1, factor));
    
    // Transform the linear factor into an ease-out factor
    const easeOutFactor = t * (2 - t);
    
    return current[direction] + (target[direction] - current[direction]) * easeOutFactor;
}
const easeInOutLerp = (target: {x:number,y:number}, current: {x:number,y:number}, factor: number,direction:'y'|'x'): number => {
    const t = Math.max(0, Math.min(1, factor));
    
    // Smoothstep formula: 3t^2 - 2t^3
    const easeInOutFactor = t * t * (3 - 2 * t);
    
    return current[direction] + (target[direction] - current[direction]) * easeInOutFactor;
}
const elasticOutLerp = (target: {x:number,y:number}, current: {x:number,y:number}, factor: number,direction:'y'|'x'): number => {
    const t = Math.max(0, Math.min(1, factor));
    
    // Exponential decay mixed with a sine wave for the wobble
    const elasticFactor = Math.sin((-13 * Math.PI / 2) * (t + 1)) * Math.pow(2, -10 * t) + 1;
    
    return current[direction] + (target[direction] - current[direction]) * elasticFactor;
}
const bounceOutLerp = (target: {x:number,y:number}, current: {x:number,y:number}, factor: number,direction:'y'|'x'): number => {
    let t = Math.max(0, Math.min(1, factor));
    let bounceFactor = 0;

    // Standard multi-stage bouncing math
    if (t < 1 / 2.75) {
        bounceFactor = 7.5625 * t * t;
    } else if (t < 2 / 2.75) {
        bounceFactor = 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;
    } else if (t < 2.5 / 2.75) {
        bounceFactor = 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375;
    } else {
        bounceFactor = 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
    }

    return current[direction] + (target[direction] - current[direction]) * bounceFactor;
}
const anticipateLerp = (target: {x:number,y:number}, current: {x:number,y:number}, factor: number,direction:'y'|'x'): number => {
    const t = Math.max(0, Math.min(1, factor));
    
    // A simple wind-up: move slightly in the opposite direction when the
    // distance is large, then accelerate toward the target.
    const dist = target[direction] - current[direction];
    const overshoot = Math.sin(t * Math.PI) * -0.15; // The "wind-up"
    
    return current[direction] + (dist * t) + (dist * overshoot);
}
const lerpDegrees = (target: {x:number,y:number}, current: {x:number,y:number}, factor: number,direction:'y'|'x'): number => {
    let difference = (target[direction] - current[direction]) % 360;
    
    // Find the shortest directional path (-180 to 180)
    if (difference > 180) difference -= 360;
    if (difference < -180) difference += 360;
    
    return current[direction] + difference * factor;
}
const CurentLerpFunction = (type:OPTIONS['easingFunctionName'], props:{
    target: {x:number,y:number},
    current: {x:number,y:number},
    customEasingFunction: OPTIONS['customEasingFunction'],
    factor: number
    stiffness: number,
    damping: number,
    velocityRef: any,
    direction:'y'|'x'
} ) =>{
    if (props.customEasingFunction) {
        const t = Math.max(0, Math.min(1, props.factor));
        const customFactor = props.customEasingFunction(t);
        return props.current[props.direction] + (props.target[props.direction] - props.current[props.direction]) * customFactor;
    }
    switch(type){
        case 'linear':
            return linearLerp(props.target, props.current, props.factor ,props.direction);
        case 'easeIn':
            return easeInLerp(props.target, props.current, props.factor,props.direction);
        case 'easeOut':
            return easeOutLerp(props.target, props.current, props.factor,props.direction);
        case 'easeInOut':
            return easeInOutLerp(props.target, props.current, props.factor,props.direction);
        case 'spring':
            return springlerp(props.target, props.current,props.direction,props.stiffness, props.damping, props.velocityRef );
        case 'bounce':
            return bounceOutLerp(props.target, props.current, props.factor ,props.direction);
        case 'elastic':
            return elasticOutLerp(props.target, props.current, props.factor,props.direction);
        case 'anticipate':
            return anticipateLerp(props.target, props.current, props.factor,props.direction);
        // case 'lerpDegrees':
        //     return lerpDegrees(props.target, props.current, props.factor);
        default:
            return linearLerp(props.target, props.current, props.factor,props.direction);
    }
}
// const cubicHermiteLerp = (
//     target: number, 
//     current: number, 
//     startVelocity: number, 
//     endVelocity: number, 
//     factor: number
// ): number => {
//     const t = Math.max(0, Math.min(1, factor));
//     const t2 = t * t;
//     const t3 = t2 * t;

//     // Hermite basis functions
//     const h1 = 2 * t3 - 3 * t2 + 1;
//     const h2 = -2 * t3 + 3 * t2;
//     const h3 = t3 - 2 * t2 + t;
//     const h4 = t3 - t2;

//     return (h1 * current) + (h2 * target) + (h3 * startVelocity) + (h4 * endVelocity);
// }
// Example: lerpDegrees(10, 350, 0.5) correctly returns 0 (or 360) degrees.
const useScrollParallax = (options?: OPTIONS) => {
  const defaultOptions = {
    direction: 'both',
    smoothness: 0.1,
    speed: 0.5,
    easingFunctionName: 'linear',
    stiffness: 0.04,
    damping: 0.05,
    customEasingFunction: undefined,
    triggerPercentage: 0.5,
    enabled: true,
    reverseDirection: true,
    maxMoveX: 0,
    maxMoveY: 0,
    containerRef: undefined,
  }
  //@ts-ignore
  const mergedOptions:OPTIONS = {
    ...defaultOptions,
    ...options,
  }
    const [smoothScrollYProgress, setSmoothScrollYProgress] = useState(0);
    const [smoothScrollXProgress, setSmoothScrollXProgress] = useState(0);
    const velocityRef = useRef({
        vx:0,
        vy:0
    });
      const targetProgressRef = useRef({
        x:0,
        y:0
      });
  const currentProgressRef = useRef({
    x:0,
    y:0
  });
  const animationFrameRef = useRef<number | null>(null);
  const handleScroll = () =>{
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    targetProgressRef.current ={
        y: Math.min(1, scrollY / viewportHeight),
        x: Math.min(1, scrollX / viewportWidth)
    }
  }
  const handleContainerScroll = () =>{
    const scrollY = mergedOptions.containerRef?.current?.scrollTop;
    const scrollX = mergedOptions.containerRef?.current?.scrollLeft;
    const viewportHeight = mergedOptions.containerRef?.current?.clientHeight;
    const viewportWidth = mergedOptions.containerRef?.current?.clientWidth;
    targetProgressRef.current ={
        y: Math.min(1, scrollY! / viewportHeight!),
        x: Math.min(1, scrollX! / viewportWidth!)
    }
  }
  const updatePosition = () => {
    const target = targetProgressRef.current;
      const current = currentProgressRef.current;
      const nextProgressY = CurentLerpFunction(mergedOptions.easingFunctionName,{
        target,
        current,
        customEasingFunction: mergedOptions.customEasingFunction,
        factor: mergedOptions.smoothness!,
        stiffness: mergedOptions.stiffness!,
        damping: mergedOptions.damping!,
        velocityRef,
        direction: 'y'
      })
      const nextProgressX = CurentLerpFunction(mergedOptions.easingFunctionName,{
        target,
        current,
        customEasingFunction: mergedOptions.customEasingFunction,
        factor: mergedOptions.smoothness!,
        stiffness: mergedOptions.stiffness!,
        damping: mergedOptions.damping!,
        velocityRef,
        direction: 'x'
      })
        currentProgressRef.current = {
            x: nextProgressX,
            y: nextProgressY
        };
      if (Math.abs(target.x - nextProgressX) > 0.00001 || Math.abs(velocityRef.current.vx) > 0.00001 || Math.abs(velocityRef.current.vy) > 0.00001 || Math.abs(target.y - nextProgressY) > 0.00001) {
        setSmoothScrollYProgress(nextProgressY);
        setSmoothScrollXProgress(nextProgressX)
      } else {
        currentProgressRef.current = target;
        velocityRef.current = {
            vx:0,
            vy:0
        }
        
        setSmoothScrollYProgress(target.y);
        setSmoothScrollXProgress(target.x);
      }

      animationFrameRef.current = requestAnimationFrame(updatePosition);
  }
    useEffect(() => {
      if(mergedOptions.containerRef && mergedOptions.containerRef.current){
        mergedOptions.containerRef.current.addEventListener('scroll', handleContainerScroll, { passive: true });
        animationFrameRef.current = requestAnimationFrame(updatePosition);
        handleContainerScroll();
        return () => {
          mergedOptions.containerRef!.current.removeEventListener('scroll', handleContainerScroll);
          if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
          }
        };
      }else{
       window.addEventListener('scroll', handleScroll, { passive: true });
      animationFrameRef.current = requestAnimationFrame(updatePosition);
  
      handleScroll();
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
      }
  
      
    }, [options]);
    if(mergedOptions.reverseDirection){
        return {
            smoothScrollYProgress: - smoothScrollYProgress,
            smoothScrollXProgress: - smoothScrollXProgress,
        }
    }
    return {
        smoothScrollYProgress,
        smoothScrollXProgress,
    }
}

export default useScrollParallax;
