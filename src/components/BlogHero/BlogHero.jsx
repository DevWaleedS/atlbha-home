import React from 'react';
import './BlogHero.css';
import { ReactComponent as SvgSearch } from '../../assets/Icons/icon_24_search.svg';
const BlogHero = () => {
	return (
		<>
			<div className='blog-hero'>
				<div className='container'>
					<div className='all'>
						<form action=''>
							<input type='text' name='' id='' placeholder='البحث في الصفحة الرئيسية' />
							<button>
								<SvgSearch />
							</button>
						</form>
						<h4>المقالات</h4>
					</div>
				</div>
			</div>
		</>
	);
};

export default BlogHero;
