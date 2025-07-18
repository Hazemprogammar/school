import { Controller, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EducationLevel, Gender, Student } from "@/types/student";
import dayjs from "dayjs";

export const StudentInfoTab = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<Student>();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label htmlFor="student_name">اسم الطالب رباعي *</Label>
        <Input
          id="student_name"
          {...register("student_name", {
            required: {
              value: true,
              message: "اسم الطالب مطلوب",
            },
            validate: {
              minWords: (value) => {
                const words = value
                  .trim()
                  .split(/\s+/)
                  .filter((word) => word.length > 0);
                return (
                  words.length >= 4 ||
                  "يجب إدخال الاسم الرباعي (4 كلمات على الأقل)"
                );
              },
            },
          })}
          className={errors.student_name ? "border-red-500" : ""}
        />
        {errors.student_name && (
          <p className="text-sm text-red-500">{errors.student_name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="date_of_birth">تاريخ الميلاد *</Label>
        <Controller
          name="date_of_birth"
          control={control}
          rules={{
            required: "تاريخ الميلاد مطلوب",
            validate: (value) => {
              const date = dayjs(value);
              const today = dayjs();
              if (date.isAfter(today)) {
                return "تاريخ الميلاد لا يمكن أن يكون في المستقبل";
              }
              if (today.diff(date, "year") < 3) {
                return "الطالب يجب أن يكون عمره أكثر من 3 سنوات";
              }
              return true;
            },
          }}
          render={({ field }) => (
            <div>
              <Input
                id="date_of_birth"
                type="date"
                {...field}
                value={field.value || ""}
                className={errors.date_of_birth ? "border-red-500" : ""}
              />
              {errors.date_of_birth && (
                <p className="text-sm text-red-500 mt-1">{errors.date_of_birth.message}</p>
              )}
            </div>
          )}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="gender">الجنس *</Label>
        <Controller
          control={control}
          name="gender"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className={errors.gender ? "border-red-500" : ""}>
                <SelectValue placeholder="اختر الجنس" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={Gender.Male}>{Gender.Male}</SelectItem>
                <SelectItem value={Gender.Female}>{Gender.Female}</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.gender && (
          <p className="text-sm text-red-500">{errors.gender.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="wished_level">المرحلة الدراسية المرغوبة *</Label>
        <Controller
          name="wished_level"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className={errors.wished_level ? "border-red-500" : ""}>
                <SelectValue placeholder="اختر المرحلة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={EducationLevel.Secondary}>
                  {EducationLevel.Secondary}
                </SelectItem>
                <SelectItem value={EducationLevel.Intermediate}>
                  {EducationLevel.Intermediate}
                </SelectItem>
                <SelectItem value={EducationLevel.Primary}>
                  {EducationLevel.Primary}
                </SelectItem>
                <SelectItem value={EducationLevel.Kindergarten}>
                  {EducationLevel.Kindergarten}
                </SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.wished_level && (
          <p className="text-sm text-red-500">{errors.wished_level.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="medical_condition">الحالة الصحية</Label>
        <Input
          id="medical_condition"
          {...register('medical_condition')}
          className={errors.medical_condition ? "border-red-500" : ""}
        />
        {errors.medical_condition && (
          <p className="text-sm text-red-500">{errors.medical_condition.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="goverment_id">الرقم الوطني</Label>
        <Input
          id="goverment_id"
          {...register('goverment_id')}
          className={errors.goverment_id ? "border-red-500" : ""}
        />
        {errors.goverment_id && (
          <p className="text-sm text-red-500">{errors.goverment_id.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="referred_school">اسم المدرسة السابقة</Label>
        <Input
          id="referred_school"
          {...register('referred_school')}
          className={errors.referred_school ? "border-red-500" : ""}
        />
        {errors.referred_school && (
          <p className="text-sm text-red-500">{errors.referred_school.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="success_percentage">نسبة النجاح</Label>
        <Input
          id="success_percentage"
          type="number"
          min="0"
          max="100"
          {...register('success_percentage')}
          className={errors.success_percentage ? "border-red-500" : ""}
        />
        {errors.success_percentage && (
          <p className="text-sm text-red-500">{errors.success_percentage.message}</p>
        )}
      </div>
    </div>
  );
};
