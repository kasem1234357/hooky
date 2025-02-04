'use client'
import React, { useState } from "react";
import useSequentialFunctions, { FunctionWithDelay } from '@/hooks/useSequentialFunctions';

function SequentialFunctionsExample() {
  const [log, setLog] = useState<string[]>([]);

  // دوال مع تأخيرات مختلفة
  const functions: FunctionWithDelay[] = [
    {
      callback: () => {
        setLog((prev) => [...prev, "تم تشغيل الدالة 1"]);
        console.log("تم تشغيل الدالة 1");
      },
      delay: 1000, // تأخير 1 ثانية قبل الدالة 1 (يُستخدم لتشغيل الدالة التالية)
    },
    {
      callback: () => {
        setLog((prev) => [...prev, "تم تشغيل الدالة 2"]);
        console.log("تم تشغيل الدالة 2");
      },
      delay: 2000, // تأخير 2 ثانية قبل الدالة 2
    },
    {
      callback: () => {
        setLog((prev) => [...prev, "تم تشغيل الدالة 3"]);
        console.log("تم تشغيل الدالة 3");
      },
      delay: 1500, // تأخير 1.5 ثانية قبل الدالة 3
    },
  ];

  // استخدام الخطاف مع الخيارات المناسبة.
  const { start, cancel, isRunning,pause } = useSequentialFunctions(functions, {
    autoStart: false, // سنبدأ التشغيل يدويًا
    onComplete: () => {
      setLog((prev) => [...prev, "انتهت السلسلة"]);
      console.log("انتهت السلسلة");
    },
    onError: (error) => {
      setLog((prev) => [...prev, `حدث خطأ: ${error}`]);
      console.error("حدث خطأ:", error);
    },
  });

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>مثال على تشغيل دوال متتالية مع تأخيرات</h2>
      <p>
        <strong>حالة التشغيل:</strong> {isRunning ? "قيد التشغيل" : "متوقف"}
      </p>
      <div style={{ marginTop: "10px" }}>
        <button className="px-4 py-2 rounded-md bg-green-600" onClick={start} style={{ marginRight: "10px" }}>
          بدء السلسلة
        </button>
        <button className="px-4 py-2 rounded-md bg-yellow-600" onClick={pause} style={{ marginRight: "10px" }}>
          اكمال السلسلة
        </button>
        <button className="px-4 py-2 rounded-md bg-red-600" onClick={cancel}>إلغاء السلسلة</button>
      </div>
      <div style={{ marginTop: "20px" }}>
        <h3>السجل:</h3>
        <ul>
          {log.map((entry, index) => (
            <li key={index}>{entry}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SequentialFunctionsExample;
