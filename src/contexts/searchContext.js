import React, { useState, useEffect } from "react";

export const SearchContext = React.createContext();

export function SearchProvider({ children }) {
  const [searchText, setSearchText] = useState("");
  const [searchTags, setSearchTags] = useState([]);
  const [searchUrl, setSearchUrl] = useState("");
  const [searchWeek, setSearchWeek] = useState("All Weeks");
  const [searchLecturer, setSearchLecturer] = useState("All Lecturers");
  const [tagState, setTagState] = useState({
    selectedTags: [],
  });
  const [paginationSize] = useState(15);
  const [paging, setPaging] = useState({ position: 1, paging: paginationSize });

  useEffect(() => {
    let searchArray = [];

    //search text
    if (searchText) {
      searchArray.push(["search", searchText]);
    }

    //week
    if (searchWeek !== "All Weeks") {
      searchArray.push(["week", searchWeek]);
    }

    //lecturer
    if (searchLecturer !== "All Lecturers") {
      searchArray.push(["lecturer", searchLecturer]);
    }

    //tags
    let searchTagsConvert = [];
    if (searchTags !== []) {
      searchTagsConvert = [...searchTags.map((tag) => ["tag", tag])];
    }

    //no search clearing
    if (
      searchText === "" &&
      searchWeek === "All Weeks" &&
      searchLecturer === "All Lecturers" &&
      tagState.selectedTags.length < 1
    ) {
      setPaging();
      setPaging({ position: 1, paging: paginationSize });
    }

    searchArray = [...searchArray, ...searchTagsConvert];
    setSearchUrl(new URLSearchParams(searchArray).toString());
  }, [searchText, searchTags, searchWeek, searchLecturer]);

  function getSearchText(value) {
    setSearchText(value);
  }

  function getSearchTags(tags) {
    setSearchTags(tags);
  }

  function getSearchWeek(week) {
    setSearchWeek(week);
  }

  function getSearchLecturer(lecturer) {
    setSearchLecturer(lecturer);
  }

  function handleTagChange(tag, checked) {
    const { selectedTags } = tagState;

    let nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);

    setTagState({ selectedTags: nextSelectedTags });
    getSearchTags(nextSelectedTags);
  }

  return (
    <SearchContext.Provider
      value={{
        searchText,
        getSearchText,
        getSearchTags,
        searchUrl,
        getSearchWeek,
        getSearchLecturer,
        searchLecturer,
        searchWeek,
        setTagState,
        tagState,
        handleTagChange,
        paging,
        setPaging,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
