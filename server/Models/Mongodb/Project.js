import mongoose from "mongoose";
import WorkstateSchema from "./Workstate.js";
import TaskLabel from "./TaskLabel.js";
import Department from "./Department.js";

const Schema = mongoose.Schema;

const ProjectSchema = new Schema(
  {
    name: String,
    description: String,
    workstates: [{ type: mongoose.Schema.ObjectId, ref: "Workstates", default: () => [] }],
    labels: [{ type: mongoose.Schema.ObjectId, ref: "TaskLabels", default: () => [] }],
    users: [{ type: mongoose.Schema.ObjectId, ref: "Users", default: () => [] }],
    active: {
      type: Boolean,
      default: false
    },
    done: {
      type: Boolean,
      default: false
    },
    deadline: Date,
    startedAt: Date,
  },
  { timestamps: true, versionKey: false }
);

ProjectSchema.pre(/(delete)\i/, async function (next) {
  try {
    const project = await this.model.findOne(this.getFilter());
    await WorkstateSchema.deleteMany({ _id: { $in: project.workstate } });
    await TaskLabel.deleteMany({ _id: { $in: project.labels}})
    // await Department.updateOne({projects: project._id}, {$pull: {_id: project._id}})
    next();
  } catch (err) {
    next(err);
  }
});

const Project = mongoose.model("Projects", ProjectSchema);
export default Project;
