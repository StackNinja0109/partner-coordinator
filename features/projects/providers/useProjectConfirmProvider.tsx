import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation"
import { getDoc } from "firebase/firestore";
import { DocRef, getDocIdWithData } from "@/libs/firebase/firestore";
import { LeaderProject, initialLeaderProject } from "../shared/types";

export const useProjectConfirmProvider = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const { id } = params as { id: string }

  const [project, setProject] = useState<LeaderProject>(initialLeaderProject)

  useEffect(() => {
    const fetchProject = async () => {
      setIsLoading(true)
      
      const [projectDoc] = await Promise.all([
        getDoc(DocRef.leadersWantedProjects(id))
      ])
      const projectObject = await getDocIdWithData(projectDoc);
      setProject(projectObject)
      setIsLoading(false)
    }
    fetchProject();
  }, [])

  // BACKBUTTON
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const openCancelModal = () => {
    setIsCancelModalOpen(true);
  };
  const closeCancelModal = () => {
    setIsCancelModalOpen(false);
  };    // BACKBUTTON

  const onSubmit = async (e) => {
    e.preventDefault()
    router.push(`/projects/prepare`)
  }

  return {
    project,
    onSubmit,
    openCancelModal,
    isLoading,
  }
}