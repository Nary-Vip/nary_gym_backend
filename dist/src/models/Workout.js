"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkOutType = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
var WorkOutType;
(function (WorkOutType) {
    WorkOutType["LEG"] = "LEG";
    WorkOutType["CHEST"] = "CHEST";
    WorkOutType["BACK"] = "BACK";
    WorkOutType["SHOULDER"] = "SHOULDER";
})(WorkOutType || (exports.WorkOutType = WorkOutType = {}));
const workoutSchema = new mongoose_1.default.Schema({
    workOutName: {
        type: String,
        required: true
    },
    workOutType: {
        type: String,
        enum: Object.values(WorkOutType),
        required: true
    },
    workOutImage: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});
const Workout = mongoose_1.default.model("Workout", workoutSchema);
exports.default = Workout;
