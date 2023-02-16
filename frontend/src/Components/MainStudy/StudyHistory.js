import { useOutletContext } from "react-router-dom";
import { Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import StudyStyle from "../../Style/MainStudy/StudyDetail.module.css";

const StudyHistory = () => {
  const { studydata } = useOutletContext();
  return (
    <div className={StudyStyle.studyInfoContainer}>
      <div className={StudyStyle.studyContent}>
        <div className={StudyStyle.StudyViewer}>
          <Viewer initialValue={studydata.description || ""} />
        </div>
      </div>
    </div>
  );
};

export default StudyHistory;
