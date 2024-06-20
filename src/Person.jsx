// src/Person.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AudioPlayer from './components/AudioPlayer';
import PersonStats from './components/PersonStats';
import vocals from './vocals'; // Import the mapping
import { Link } from "react-router-dom";

const Person = () => {  
  const { name } = useParams();
  const [vocalList, setvocalList] = useState([]);

  useEffect(() => {
    if (vocals[name]) {
      const vocalList = vocals[name].map((filename, index) => ({
        title: `${vocals[name][index]}`.replace('.mp3',' '),
        src: `/vocals/${name}/${filename}`
      }));
      setvocalList(vocalList);
    } else {
      console.error('No vocals found for this person');
    }
  }, [name]);

  return (
    <div>
      <Link to={`/`} relative="path">
      <button>Weli</button>
      </Link>
      
      
      <PersonStats name={"Moayed"}></PersonStats>
      <h2 className='person-title'>Les vocal te3 {name}:</h2>
      {vocalList.length > 0 ? (
        <AudioPlayer tracks={vocalList} />
      ) : (
        <p>Mkesh les vocals...</p>
      )}
    </div>
  );
};

export default Person;
