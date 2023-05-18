import React, { useEffect, useMemo, useState } from "react";
import "./ChefPage.scss";
import { Chef, ChefCategory } from "../../models";
import { filterChefs, getChefs } from "../../services";
import { Card } from "../../components";
import { closeAllNavbar, useAppDispatch } from "../../store";
const ChefPage: React.FC = () => {
  const [chefs, setChefs] = useState<Chef[]>([]);
  const [displayChefs, setDisplayChefs] = useState<Chef[]>([]);
  const [chefsCategory, setChefsCategory] = useState<string>(ChefCategory.All);
  const dispatch = useAppDispatch();
  const sendCloseNavbar = () => dispatch(closeAllNavbar(false));
  const changeCategory = (category: ChefCategory) => () => setChefsCategory(category)
  useEffect(() => {
    getChefs().then((chefs) =>chefs && setChefs(chefs)).catch((err) => console.log(err))
  }, []);
  const sortedChefs = useMemo(()=> displayChefs.slice()?.sort((a, b) => a.fullName.localeCompare(b.fullName)),[displayChefs]);
  useEffect(() => setDisplayChefs(filterChefs(chefs, chefsCategory)) ,[chefs, chefsCategory]);
 
  return (
    <>
      <section onClick={sendCloseNavbar} className="chef-section">
        <div className="chef-title">
          <h2>CHEFS</h2>
        </div>
        <ul className="chef-category">
          <li onClick={changeCategory(ChefCategory.All)} className={ chefsCategory == ChefCategory.All ? "selected" : "category" } >
            <p>{ChefCategory.All}</p>
          </li>
          <li onClick={changeCategory(ChefCategory.new)} className={ chefsCategory == ChefCategory.new ? "selected" : "category" } >
            <p>{ChefCategory.new}</p>
          </li>
          <li onClick={changeCategory(ChefCategory.Viewed)} className={ chefsCategory == ChefCategory.Viewed ? "selected" : "category" } >
            <p>{ChefCategory.Viewed}</p>
          </li>
        </ul>
        <div className="chef-list">
          {sortedChefs.map((chef) => ( <Card key={chef._id} card={chef} /> ))}
        </div>
      </section>
    </>
  );
};

export default ChefPage;
