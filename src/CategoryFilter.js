import { useState } from "react";
import CATEGORIES from "./Resources";

function CategoryFilter(props) {
  const { setCategory } = props;
  const [areVisible, setAreVisible] = useState(false);

  return (
    <aside>
      <ul className="category-list">
        <li className="category">
          <button
            className="btn btn-categories-filter"
            onClick={() => setAreVisible(!areVisible)}
          >
            category filter
          </button>
        </li>

        {areVisible ? (
          <>
            <li className="category">
              <button
                className="btn btn-all-categories"
                onClick={() => setCategory("all")}
              >
                all
              </button>
            </li>
            {CATEGORIES.map((cat) => (
              <li key={cat.name} className="category">
                <button
                  className="btn btn-category"
                  style={{ backgroundColor: cat.color }}
                  onClick={() => setCategory(cat.name)}
                >
                  {cat.name}
                </button>
              </li>
            ))}
          </>
        ) : null}
      </ul>
    </aside>
  );
}

export default CategoryFilter;
