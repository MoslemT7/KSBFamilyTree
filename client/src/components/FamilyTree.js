import React, { useEffect, useState } from 'react';
import Tree from 'react-d3-tree';
import './FamilyTree.css';
const translations = require('./translation.json');

let uniqueKeyCounter = 0;
export const translateName = (name) => {
  return translations[name] || name;
};

const renderFamilyTree = (person, parentId = null, level = 0) => {
  const uniqueKey = `${person.name}-${person.lastName}-${parentId}-${level}-${uniqueKeyCounter++}`;

  return (
    <div key={uniqueKey}>
      <div>
        <strong>{person.name} {person.lastName}</strong>
      </div>
      {person.children && person.children.length > 0 && (
        <div style={{ marginLeft: '20px' }}>
          {person.children.map((child) => renderFamilyTree(child, person.id, level + 1))}
        </div>
      )}
    </div>
  );
};

const fetchFamilyTree = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/family-tree');

    if (!response.ok) {
      throw new Error('Server error');
    }

    const data = await response.json(); // Parse JSON if response is valid
    return data;
  } catch (error) {
    console.error('Error fetching family tree:', error.message);
    return [];
  }
};

const formatFamilyTreeData = (person) => {
  const children = person.children && person.children.length > 0
    ? person.children.map(formatFamilyTreeData) // Recursively format children
    : [];

  return {
    name: `${person.name} ${person.lastName}`,
    children: children // Include children for each person
  };
};

const getChildrenOfFather = (fatherId, allPeople) => {
  const father = allPeople.filter(father => father.id === fatherId)[0];  
  return father && father.children ? father.children : [];  
};


const buildTree = (person, allPeople) => {
  if (!person) return null;

  const children = getChildrenOfFather(person.id, allPeople)
    .map(child => buildTree(child, allPeople))
    .filter(Boolean); 

    
  return {
    name: translateName(person.name),
    children: children.length > 0 ? children : undefined, 
  };
};

const FamilyTree = () => {
  const [familyTree, setFamilyTree] = useState(null);
  const [highlightedNodes, setHighlightedNodes] = useState([]);
  // const treeRef = useRef();

  useEffect(() => {
    const loadFamilyTree = async () => {
      try {
        const people = await fetchFamilyTree();

        if (Array.isArray(people) && people.length > 0) {
          const rootPerson = people.find(p => p.id === 17);

          const treeData = buildTree(rootPerson, people); 
          setFamilyTree(treeData);                      
        } else {
          console.warn("Empty or invalid people data");
        }
      } catch (error) {
        console.error('Error loading family tree:', error);
      }
    };

    loadFamilyTree();
  }, []);

  if (!familyTree) return <div>Loading...</div>;

  return (
    <div id="treeWrapper" style={{ width: '100vw', height: '100vh' }}>
      <Tree
  data={familyTree}
  orientation="vertical"
  width={1000}
  height={800}
  pathFunc="step"
  renderCustomNodeElement={({ nodeDatum }) => (
    <g>
      {/* Rectangle as the background */}
      <rect
        x="-50" // Adjust X position
        y="-20" // Adjust Y position
        width="100" // Width of the rectangle
        height="40" // Height of the rectangle
        fill="lightblue" // Background color
        stroke="black" // Border color
        strokeWidth="2" // Border width
        rx="10" // Rounded corners
      />
      {/* Name text inside the rectangle */}
      <text
        x="0" // Center the text horizontally
        y="5" // Adjust text position vertically
        fontSize="24"
        textAnchor="middle" // Align text to the center
        fill="black" // Text color
      >
        {nodeDatum.name}
      </text>
    </g>
  )}

/>
    </div>
  );
};

export default FamilyTree;
