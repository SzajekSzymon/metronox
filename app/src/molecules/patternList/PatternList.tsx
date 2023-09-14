import Link from "next/link";
import { useAppDispatch } from "../../store/hooks";
import { PatternState, patternActions } from "../../store/patternSlice";
import { Icon } from "../Icon/Icon";
import "./patternList.scss";
import { useSession } from "next-auth/react";

type PatternListProps = {
  list: PatternState[];
};

export const PatternList = ({ list }: PatternListProps) => {
  const dispatch = useAppDispatch();

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {},
  });

  return (
    <div className="patternList">
      <div className="patternList__item header">
        <div>
          <span>Project Name</span>
        </div>
        <div>
          <span>Owner</span>
        </div>
        <div>
          <span>Created at</span>
        </div>
      </div>
      {list.map((el) => (
        <div className="patternList__item" key={el._id}>
          <div>
            <span>{el.projectName}</span>
          </div> 
          <div>
            <span>{el.owner}</span>
          </div>
          <div>
            <span>{el.created_at}</span>
          </div>
          <div>
            <span
              onClick={() => {
                dispatch(patternActions.setProject({...el, _id: null, owner: session?.user?.email || '', created_at: new Date().toDateString() }));
              }}
            >
              <Link href="/">
                <Icon iconName="play" className="icon__play" alt={"play"} />
              </Link>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
