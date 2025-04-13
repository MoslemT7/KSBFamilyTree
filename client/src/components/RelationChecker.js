import React, { useState } from 'react';

const RelationChecker = () => {
  const [person1, setPerson1] = useState('');
  const [person2, setPerson2] = useState('');
  const [result, setResult] = useState('');

  const checkRelation = async () => {
    try {
      const response = await fetch('/api/relationship', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ person1, person2 }),
      });
      const data = await response.json();
      setResult(data.relationship || 'No relation found');
    } catch (err) {
      setResult('Error fetching relation');
    }
  };

  return (
    <div id="relation" className="relation-checker">
      <h2>ماهي العلاقة بينهما؟</h2>
      <input
        type="text"
        placeholder="الاسم الكامل الأول"
        value={person1}
        onChange={(e) => setPerson1(e.target.value)}
      />
      <input
        type="text"
        placeholder="الاسم الكامل الثاني"
        value={person2}
        onChange={(e) => setPerson2(e.target.value)}
      />
      <button onClick={checkRelation}>تحقق</button>
      {result && <p>العلاقة: {result}</p>}
    </div>
  );
};

export default RelationChecker;
