import { PatternState } from "../../store/patternSlice";

type PatternListProps = {
  list: PatternState[];
};

export const PatternList = ({ list }: PatternListProps) => {
  return (
    <div>
      {list.map((el) => (
        <div key={el._id}>
          <div>
            <span>{el.projectName}</span>
          </div>
          <div>
            <span>{el.owner}</span>
          </div>
          <div>
            <span>{el.created_at}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
