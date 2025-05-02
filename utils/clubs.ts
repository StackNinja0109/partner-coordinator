import { db, collection, getDocs } from "@/libs/firebase/firebase"
const clubTypeCategoriesRef = collection(db, 'clubTypeCategories')

export const getClubNames = async () => {
	const clubTypeCategoriesDocs = await getDocs(clubTypeCategoriesRef)
	const clubNames = [{
		value: '',
		label: 'すべての種目',
	}]
	clubTypeCategoriesDocs.forEach(doc => {
		const clubName = doc.data().name
		clubNames.push({
			value: clubName,
			label: clubName
		})
	})
	return clubNames
}