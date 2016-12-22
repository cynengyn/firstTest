name := """firstTest"""

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayJava)

scalaVersion := "2.11.7"

libraryDependencies ++= Seq(
  javaJdbc,
  cache,
  javaWs
)

libraryDependencies ++= Seq(
  "org.postgresql" % "postgresql" % "9.4.1212.jre7"
)
