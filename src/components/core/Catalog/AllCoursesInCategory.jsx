import React, { useState, useMemo } from "react";
import HorizontalCourseCard from "./HorizontalCourseCard";
import { BsChevronDown } from "react-icons/bs";

const AllCoursesInCategory = ({ catalogName, courses, ratingArray, durationArray }) => {
    const [showRatings, setShowRatings] = useState(false);
    const [showVideoDuration, setShowVideoDuration] = useState(false);
    const [showPrice, setShowPrice] = useState(false);

    const [selectedPrice, setSelectedPrice] = useState("");
    const [selectedRating, setSelectedRating] = useState("");
    const [selectedDuration, setSelectedDuration] = useState("");

    const clearFilters = () => {
        setSelectedPrice("");
        setSelectedRating("");
        setSelectedDuration("");
    };

    const filteredCourses = useMemo(() => {
        if (!selectedPrice && !selectedRating && !selectedDuration) return courses;

        return courses.filter(course => {
            const rating = ratingArray?.[course._id?.toString()] || 0;
            const duration = durationArray?.[course._id?.toString()]?.totalSeconds || 0;
            const totalMinutes = duration / 60;

            let priceMatch = true, ratingMatch = true, durationMatch = true;

            // Price Filter
            if (selectedPrice) {
                if (selectedPrice === "0-500") priceMatch = course.price >= 0 && course.price <= 500;
                else if (selectedPrice === "500-1000") priceMatch = course.price > 500 && course.price <= 1000;
                else if (selectedPrice === "1000+") priceMatch = course.price > 1000;
            }

            // Rating Filter
            if (selectedRating) {
                ratingMatch = rating >= parseFloat(selectedRating);
            }

            // Duration Filter
            if (selectedDuration) {
                if (selectedDuration === "0-30") durationMatch = totalMinutes >= 0 && totalMinutes <= 30;
                else if (selectedDuration === "30-60") durationMatch = totalMinutes > 30 && totalMinutes <= 60;
                else if (selectedDuration === "60+") durationMatch = totalMinutes > 60;
            }

            return priceMatch && ratingMatch && durationMatch;
        });
    }, [courses, selectedPrice, selectedRating, selectedDuration, ratingArray, durationArray]);

    return (
        <div className="bg-slate-600 w-full px-0 md:px-4 py-6 lg:max-w-maxContent mx-auto">
            {catalogName && (
                <div className="text-3xl md:pl-0 pl-4 mb-6 text-white font-bold">
                    All courses in "{catalogName}"
                </div>
            )}

            <div className="flex flex-col md:flex-row">
                {/* Sidebar */}
                <aside className="w-full md:w-[250px] mr-6 py-4 text-white">
                    <ul className="space-y-2 text-lg">
                        {/* Ratings Filter */}
                        <li className="py-2 border-y-[1px]">
                            <div className={`font-bold flex justify-between items-center ${showRatings ? "mb-2" : ""}`} onClick={() => setShowRatings(!showRatings)}>
                                <div>Ratings</div>
                                <span className={`${showRatings ? "rotate-0" : "rotate-180"} transition-all duration-500`}><BsChevronDown /></span>
                            </div>
                            {showRatings && (
                                <ul className="ml-4 space-y-2 text-sm">
                                    {[4.5, 3.5, 2.5].map(value => (
                                        <li key={value}>
                                            <label className="flex items-center gap-2">
                                                <input
                                                    type="radio"
                                                    name="rating"
                                                    value={value}
                                                    checked={selectedRating === String(value)}
                                                    onChange={e => setSelectedRating(e.target.value)}
                                                />
                                                <span className="text-yellow-400 text-lg">{"★".repeat(Math.floor(value)) + (value % 1 ? "☆" : "")}</span> {value} & up
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>

                        {/* Duration Filter */}
                        <li className="pb-2 border-b-[1px]">
                            <div className={`font-bold flex justify-between items-center ${showVideoDuration ? "mb-2" : ""}`} onClick={() => setShowVideoDuration(!showVideoDuration)}>
                                <div>Video Duration</div>
                                <span className={`${showVideoDuration ? "rotate-0" : "rotate-180"} transition-all duration-500`}><BsChevronDown /></span>
                            </div>
                            {showVideoDuration && (
                                <ul className="ml-4 space-y-2 text-sm">
                                    <li>
                                        <label className="flex items-center gap-2">
                                            <input type="radio" name="duration" value="0-30" checked={selectedDuration === "0-30"} onChange={e => setSelectedDuration(e.target.value)} />
                                            <span>0–30 min</span>
                                        </label>
                                    </li>
                                    <li>
                                        <label className="flex items-center gap-2">
                                            <input type="radio" name="duration" value="30-60" checked={selectedDuration === "30-60"} onChange={e => setSelectedDuration(e.target.value)} />
                                            <span>30–60 min</span>
                                        </label>
                                    </li>
                                    <li>
                                        <label className="flex items-center gap-2">
                                            <input type="radio" name="duration" value="60+" checked={selectedDuration === "60+"} onChange={e => setSelectedDuration(e.target.value)} />
                                            <span>60+ min</span>
                                        </label>
                                    </li>
                                </ul>
                            )}
                        </li>

                        {/* Price Filter */}
                        <li className="pb-2 border-b-[1px]">
                            <div className={`font-bold flex justify-between items-center ${showPrice ? "mb-2" : ""}`} onClick={() => setShowPrice(!showPrice)}>
                                <div>Price</div>
                                <span className={`${showPrice ? "rotate-0" : "rotate-180"} transition-all duration-500`}><BsChevronDown /></span>
                            </div>
                            {showPrice && (
                                <ul className="ml-4 space-y-2 text-sm text-green-300">
                                    <li>
                                        <label className="flex items-center gap-2">
                                            <input type="radio" name="price" value="0-500" checked={selectedPrice === "0-500"} onChange={e => setSelectedPrice(e.target.value)} />
                                            <span>₹0 - ₹500</span>
                                        </label>
                                    </li>
                                    <li>
                                        <label className="flex items-center gap-2">
                                            <input type="radio" name="price" value="500-1000" checked={selectedPrice === "500-1000"} onChange={e => setSelectedPrice(e.target.value)} />
                                            <span>₹500 - ₹1000</span>
                                        </label>
                                    </li>
                                    <li>
                                        <label className="flex items-center gap-2">
                                            <input type="radio" name="price" value="1000+" checked={selectedPrice === "1000+"} onChange={e => setSelectedPrice(e.target.value)} />
                                            <span>₹1000+</span>
                                        </label>
                                    </li>
                                </ul>
                            )}
                        </li>
                    </ul>

                    <div className="mt-4 px-4">
                        <button
                            onClick={clearFilters}
                            className="w-full bg-yellow-200 hover:bg-yellow-300 text-white font-semibold py-2 px-4 rounded-md transition-all duration-300"
                        >
                            Clear Filters
                        </button>
                    </div>
                </aside>

                {/* Course List */}
                <div className="flex-1">
                    {filteredCourses.length === 0 ? (
                        <div className="flex h-full justify-center items-center text-center">
                            <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-xl text-white font-semibold border-2 border-red-500 max-w-[400px] mx-auto">
                                <p className="mb-4 text-3xl font-extrabold text-red-500">
                                    Oops! No courses found.
                                </p>
                                <p className="text-lg text-gray-300">
                                    It seems there are no courses matching your selection. Try modifying your filters or explore other categories.
                                </p>
                            </div>
                        </div>
                    ) : (
                        (filteredCourses.length > 0 ? filteredCourses : courses).map((course, i) => (
                            <div className="my-3" key={course._id || i}>
                                <HorizontalCourseCard course={course} durationArray={durationArray} Height="h-[250px]" />
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default AllCoursesInCategory;
