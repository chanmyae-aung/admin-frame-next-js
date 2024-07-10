"use client";
import CourseDetailLayout from "@/components/learning/course/CourseDetailLayout";
import useActiveUI from "@/components/learning/course/hooks/useActiveUI";
import useIsInChapter from "@/components/learning/course/hooks/useIsInChapter";

// type Props = {
//   params: { courseId: string };
//   searchParams: { [key: string]: string | string[] | undefined };
// };

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   // read route params
//   const courseId = params.courseId;
//   console.log(courseId);
//   const session = await getIronSession<SessionData>(cookies(), sessionOptions);
//   const course = await fetch(
//     process.env.NEXT_PUBLIC_API_URL + "/api/v1/courses/" + courseId,
//     { headers: { Authorization: "Bearer " + session?.access_token } }
//   ).then((res) => res.json());
//   console.log(course);
//   return {
//     title: course?.data?.title,
//     description: course?.data?.description,
//     openGraph: {
//       images: [],
//     },
//   };
// }

export default function Layout(props: {
  children: React.ReactNode;
  menulist: React.ReactNode;
  chapters: React.ReactNode;
  contents: React.ReactNode;
  cover: React.ReactNode;
  item: React.ReactNode;
  certificate: React.ReactNode;
}) {
  const { isInChapter } = useIsInChapter();
  const { activeUI } = useActiveUI();

  return (
    <CourseDetailLayout
      menuItemList={isInChapter ? props.chapters : props.contents}
      listItemContainer={
        activeUI === "CONTENT"
          ? props.item
          : activeUI === "CERT"
          ? props.certificate
          : props.cover
      }
    />
  );
}
