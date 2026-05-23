import prisma from "../lib/prisma.js";

export const getStudentProfileByIdService = async (userId: string | undefined) => {
  try {
    const profile = await prisma.studentProfile.findUnique({
      where: {
        userId: userId,
      },
      select: {
        rollNo: true,
        collegeEmail: true,
        studentPhone: true,
        parentPhone: true,
        branchDepartment: {
          select: {
            branchId: true,
            departmentId: true,
            isActive: true,
          },
        },
        branch: {
          select: {
            name: true,
          },
        },
        department: {
          select: {
            name: true,
          },
        },
        semester: {
          select: {
            name: true,
            number: true,
            status: true,
            isActive: true,
            startDate: true,
            endDate: true,
            academicYear: {
              select: {
                name: true,
                startDate: true,
                endDate: true,
              },
            },
          },
        },
        submissions: {
          select: {
            marks:true,
            feedback: true,
            content: true,
            attachments: true,
            submittedAt: true,
            assignment: {
              select: {
                title: true,
                description: true,
                maxMarks: true,
                dueDate: true,
                subject:{
                  select: {
                    name: true,
                  }
                }
              }
            }
          }
        }
      },
    });

    return profile;
  } catch (err: unknown) {
    throw new Error("Error fetching student profile");
  }
};
