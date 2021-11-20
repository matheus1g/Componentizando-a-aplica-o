import '../styles/sidebar.scss';
import { Button } from '../components/Button';
import { useEffect, useState } from 'react';
import { api } from '../services/api';

interface newGenreId {
  isID: number;
  handleSelectGenreId: (id: number) => void;
}

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

export function SideBar({handleSelectGenreId, isID}: newGenreId) {

  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  
  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);


  return(
  <nav className="sidebar">
    <span>Watch<p>Me</p></span>

    <div className="buttons-container">
      {genres.map(genre => (
        <Button
          key={String(genre.id)}
          title={genre.title}
          iconName={genre.name}
          onClick={() => handleSelectGenreId(genre.id)}
          selected={isID === genre.id}
        />
      ))}
    </div>
  </nav>
  )}