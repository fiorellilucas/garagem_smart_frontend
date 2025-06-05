import React, { useState, useEffect, useRef } from 'react';
import { FiSearch } from "react-icons/fi";

interface AddressSearchProps {
  onAddressSelect: (idEstabelecimento: number) => void;
}

const AddressSearch: React.FC<AddressSearchProps> = ({ onAddressSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<{ nome: string, idEstabelecimento: number }[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [addresses, setAddresses] = useState<{ nome: string, idEstabelecimento: number }[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    fetch('http://localhost:3000/api/estabelecimentos')
      .then(res => res.json())
      .then(json => {
        const address_array = json.map((item: any) => ({
          nome: `${item["nome_estabelecimento"]} - ${item["cidade"]}/${item["estado"]}`,
          idEstabelecimento: item["id"]
        }));
        setAddresses(address_array);
      });
  }, []);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    if (value.length > 2) {
      const filtered = addresses.filter(address =>
        address.nome.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
      setIsOpen(true);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  };

  const handleSelect = (address: { nome: string; idEstabelecimento: number }) => {
    setSearchTerm(address.nome);
    onAddressSelect(address.idEstabelecimento);
    setIsOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative w-full">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Digite o nome do estabelecimento"
          className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <FiSearch className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
      </div>

      {isOpen && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion.idEstabelecimento}
              onClick={() => handleSelect(suggestion)}
              className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
            >
              {suggestion.nome}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddressSearch;
