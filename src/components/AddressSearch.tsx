import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';

interface AddressSearchProps {
  onAddressSelect: (address: string) => void
}

const AddressSearch: React.FC<AddressSearchProps> = ({ onAddressSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [addresses, setAddresses] = useState(['']);
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
        let address_array: string[] = []
        for (let idx in json) {
          address_array.push(`${json[idx]["endereco"]} - ${json[idx]["cidade"]}/${json[idx]["estado"]}`)
        }
        setAddresses(address_array)
      })
  }, [])

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    if (value.length > 2) {
      const filtered = addresses.filter(address =>
        address.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
      setIsOpen(true);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  };

  const handleSelect = (address: string) => {
    setSearchTerm(address);
    onAddressSelect(address);
    setIsOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative w-full">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Digite o endereço ou estabelecimento"
          className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
      </div>

      {isOpen && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSelect(suggestion)}
              className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddressSearch;