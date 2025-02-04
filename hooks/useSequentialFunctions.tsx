import { useRef, useState, useCallback, useEffect } from "react";

// واجهة لتحديد الدالة والتأخير الخاص بها.
export interface FunctionWithDelay {
  /** الدالة التي سيتم تنفيذها */
  callback: () => void;
  /** التأخير (بوحدة المللي ثانية) قبل تشغيل هذه الدالة */
  delay: number;
}

// الخيارات الإضافية التي يمكن تمريرها إلى الخطاف.
export interface SequentialFunctionsOptions {
  /** إذا كانت true، يبدأ تشغيل السلسلة تلقائيًا عند التركيب */
  autoStart?: boolean;
  /** دالة تُستدعى عند الانتهاء من تشغيل جميع الدوال */
  onComplete?: () => void;
  /** دالة لمعالجة الأخطاء في حالة رمي إحدى الدوال لخطأ */
  onError?: (error: unknown) => void;
}

/**
 * خطاف لتشغيل قائمة من الدوال بالتتابع مع تأخير مخصص لكل دالة.
 *
 * @param functions قائمة من الكائنات التي تحتوي على الدالة والتأخير الخاص بها.
 * @param options خيارات إضافية مثل التشغيل التلقائي ومعالجة الأخطاء.
 * @returns كائن يحتوي على دوال للتحكم في السلسلة (بدء التشغيل، الإلغاء) وحالة التشغيل.
 */
export default function useSequentialFunctions(
  functions: FunctionWithDelay[],
  options?: SequentialFunctionsOptions
) {
  const { autoStart = true, onComplete, onError } = options || {};
  
  // مرجع لتخزين معرف المؤقت الحالي.
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // مرجع لتتبع الفهرس الحالي في القائمة.
  const currentIndexRef = useRef(0);
  const [isRunning, setIsRunning] = useState(false);

  /**
   * دالة لتشغيل الدالة التالية في القائمة.
   */
  const runNextFunction = useCallback(() => {
    // إذا لم نصل إلى نهاية القائمة:
    if (currentIndexRef.current < functions.length) {
      const { callback, delay } = functions[currentIndexRef.current];
      try {
        // تنفيذ الدالة الحالية.
        callback();
      } catch (error) {
        if (onError) {
          onError(error);
        }
      }
      // زيادة الفهرس للتحرك إلى الدالة التالية.
      currentIndexRef.current++;

      // إذا كانت هناك دوال أخرى، نحدد مؤقت لتشغيل الدالة التالية بعد التأخير المحدد.
      if (currentIndexRef.current < functions.length) {
        // نحصل على التأخير من الدالة التالية.
        const nextDelay = functions[currentIndexRef.current].delay;
        timerRef.current = setTimeout(() => {
          runNextFunction();
        }, nextDelay);
      } else {
        // انتهت السلسلة.
        setIsRunning(false);
        if (onComplete) {
          onComplete();
        }
      }
    }
  }, [functions, onComplete, onError]);

  /**
   * دالة لبدء تشغيل السلسلة.
   */
  const start = useCallback(() => {
    if (functions.length === 0) return;
    // إعادة ضبط الفهرس وتشغيل السلسلة.
    currentIndexRef.current = 0;
    setIsRunning(true);
    // يبدأ التنفيذ فورًا للدالة الأولى.
    runNextFunction();
  }, [functions, runNextFunction]);

  /**
   * دالة لإلغاء تشغيل السلسلة وإيقاف أي مؤقت جارٍ.
   */
  const cancel = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setIsRunning(false);
  }, []);
  const pause = useCallback(() => {
    if (functions.length === 0) return;
    // إعادة ضبط الفهرس وتشغيل السلسلة.
    setIsRunning(true);
    // يبدأ التنفيذ فورًا للدالة الأولى.
    runNextFunction();
  }, [functions, runNextFunction]);

  // إذا كان التشغيل التلقائي مفعلًا، يبدأ التشغيل عند التركيب.
  useEffect(() => {
    if (autoStart) {
      start();
    }
    // عند إزالة التركيب، يتم إلغاء التشغيل.

  }, [autoStart, start,]);

  return { start, cancel, pause,isRunning };
}
