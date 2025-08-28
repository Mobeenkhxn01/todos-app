import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { completed } = await req.json();
  const { id } = await params;

  const todo = await prisma.todo.updateMany({
    where: { id, userId: session.user.id },
    data: { completed },
  });

  if (todo.count === 0) {
    return NextResponse.json({ error: "Not found or not authorized" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const deleted = await prisma.todo.deleteMany({
    where: { id, userId: session.user.id },
  });

  if (deleted.count === 0) {
    return NextResponse.json({ error: "Not found or not authorized" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
